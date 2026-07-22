import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import EmployeeApplication from "@/models/Employee";
import { v2 as cloudinary } from "cloudinary";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    console.log("Connected to MongoDB");

    // Optional: unsigned upload preset. If set, we use unsigned uploads (no signature).
    const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;
    if (process.env.CLOUDINARY_CLOUD_NAME) {
      cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME });
    }

    // Support both JSON and multipart/form-data (for file uploads)
    const contentType = req.headers.get("content-type") || "";
    let body: any = {};
    if (contentType.includes("multipart/form-data")) {
      // Parse multipart form data
      const formData = await req.formData();
      // Extract regular fields
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          // Convert file to base64
          const arrayBuffer = await value.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const base64 = `data:${value.type};base64,${buffer.toString("base64")}`;

          const uploadResult = await cloudinary.uploader.upload(base64, {
            resource_type: "image",
            upload_preset: CLOUDINARY_UPLOAD_PRESET,
          });

          body[key] = uploadResult.secure_url;
          body.documents = body.documents || {};
          body.documents[key] = uploadResult.secure_url;
        } else {
          body[key] = value;
        }
      }
    } else {
      // Fallback to JSON body
      body = await req.json();
    }

    // Remove any empty object values for image fields (they should be strings or undefined)
    if (body.profilePhoto && typeof body.profilePhoto === "object")
      delete body.profilePhoto;
    if (
      body.drivingLicensePhoto &&
      typeof body.drivingLicensePhoto === "object"
    )
      delete body.drivingLicensePhoto;
    if (
      body.documents?.profilePhoto &&
      typeof body.documents.profilePhoto === "object"
    )
      delete body.documents.profilePhoto;
    if (
      body.documents?.drivingLicensePhoto &&
      typeof body.documents.drivingLicensePhoto === "object"
    )
      delete body.documents.drivingLicensePhoto;

    // For JSON requests we expect the image fields to be base64 data URIs.
    // They will be stored directly in the DB without uploading to Cloudinary.
    // No further processing is needed here.


    console.log("Processed Body:", body);

    const employee = await EmployeeApplication.create(body);

    return NextResponse.json(
      {
        success: true,
        data: employee,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 },
    );
  }
}

// =======================
// Get Employees
// =======================

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const search = req.nextUrl.searchParams.get("search") || "";

    const query = search
      ? {
          $or: [
            {
              forenames: {
                $regex: search,
                $options: "i",
              },
            },
            {
              surname: {
                $regex: search,
                $options: "i",
              },
            },
            {
              emailAddress: {
                $regex: search,
                $options: "i",
              },
            },
            {
              mobile: {
                $regex: search,
                $options: "i",
              },
            },
          ],
        }
      : {};

    const employees = await EmployeeApplication.find(query).sort({
      createdAt: -1,
    });

    return NextResponse.json(
      {
        success: true,
        count: employees.length,
        data: employees,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 },
    );
  }
}

// =======================
// Delete Employee (and Cloudinary images)
// =======================
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
console.log("Deleting employee with ID:", id);
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Missing employee id' },
        { status: 400 },
      );
    }

    const employee = await EmployeeApplication.findById(id);
    if (!employee) {
      return NextResponse.json(
        { success: false, message: 'Employee not found' },
        { status: 404 },
      );
    }

    // Collect image URLs to delete from Cloudinary
    const urls: string[] = [];
    if (employee.profilePhoto) urls.push(employee.profilePhoto);
    if (employee.drivingLicensePhoto) urls.push(employee.drivingLicensePhoto);
    if (employee.documents?.profilePhoto) urls.push(employee.documents.profilePhoto);
    if (employee.documents?.drivingLicensePhoto) urls.push(employee.documents.drivingLicensePhoto);

    for (const url of urls) {
      try {
        const publicId = url.split('/')?.pop()?.split('.')?.shift();
        if (publicId) {
          await cloudinary.uploader.destroy(publicId);
        }
      } catch (err) {
        console.error('Failed to delete image from Cloudinary', url, err);
      }
    }

    await employee.deleteOne();

    return NextResponse.json(
      { success: true, data: employee },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Something went wrong',
      },
      { status: 500 },
    );
  }
}
