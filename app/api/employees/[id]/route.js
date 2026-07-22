import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import EmployeeApplication from "@/models/Employee";
import { v2 as cloudinary } from "cloudinary";

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
