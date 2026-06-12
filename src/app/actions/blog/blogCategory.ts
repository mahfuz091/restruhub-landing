/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { prisma } from "@/lib/prisma";

type ActionResult =
  | { success: true; msg: string; blogCategory?: any }
  | { success: false; msg: string };

export const blogCategoryList = async (): Promise<ActionResult> => {
  try {
    const blogCategory = await prisma.blogCategory.findMany();
    return {
      success: true,
      msg: "Category fetched successfully",
      blogCategory,
    };
  } catch (err) {
    console.error("blogCategoryList error:", err);
    return { success: false, msg: "Failed to fetch categories" };
  }
};
