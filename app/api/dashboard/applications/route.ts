import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

import { connectDB } from "@/lib/mongodb";
import EmployeeApplication from "@/models/Employee";
import User from "@/models/User";

interface TokenPayload extends JwtPayload {
  id: string;
  email: string;
  role: string;
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Verify Login
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as TokenPayload;

    const user = await User.findById(decoded.id);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

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
            {
              preferredName: {
                $regex: search,
                $options: "i",
              },
            },
          ],
        }
      : {};

    const total = await EmployeeApplication.countDocuments(query);

    const employees = await EmployeeApplication.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      success: true,
      data: employees,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(error);

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