import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import EmployeeApplication from "@/models/Employee";

export async function GET() {
  try {
    await connectDB();

    const [
      totalEmployees,
      pendingRecords,
      approvedRecords,
      rejectedRecords,
      referencesResult,
    ] = await Promise.all([
      EmployeeApplication.countDocuments(),

      EmployeeApplication.countDocuments({
        applicationStatus: "Pending",
      }),

      EmployeeApplication.countDocuments({
        applicationStatus: "Approved",
      }),

      EmployeeApplication.countDocuments({
        applicationStatus: "Rejected",
      }),

      EmployeeApplication.aggregate([
        {
          $project: {
            totalReferences: {
              $size: {
                $ifNull: ["$references", []],
              },
            },
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$totalReferences",
            },
          },
        },
      ]),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalEmployees,
        pendingRecords,
        approvedRecords,
        rejectedRecords,
        totalReferences:
          referencesResult.length > 0
            ? referencesResult[0].total
            : 0,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}