import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import EmployeeApplication from "@/models/Employee";

// =======================
// Create Employee
// =======================

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    console.log("Request Body:", body);

    const employee = await EmployeeApplication.create(body);

    return NextResponse.json(
      {
        success: true,
        data: employee,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      },
      { status: 500 }
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
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      },
      { status: 500 }
    );
  }
}