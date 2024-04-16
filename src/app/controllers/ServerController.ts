import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import { cachedDataVersionTag } from "v8";
async function apiHealth(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json({
      success: {
        message: "I am healthy.",
      },
    });
  } catch (error) {
    next(error);
  }
}

async function testData(req: Request, res: Response, next: NextFunction) {
  try {
    const data = {
      id: 10,
      name: "জব'স পাসওয়ার্ড বই( All in one) ",
      slug: "all-in-on",
      featured: 1,
      flash_sale: 0,
      product_code: "POD-10",
      product_type: 2,
      short_description:
        "জব'স পাসওয়ার্ড বই+ ৩ মাসের পেইড মেম্বারশীপ+ভিডিও ক্লাস+কুরিয়ার চার্জ ফ্রি",
      description:
        "<p>জব'স পাসওয়ার্ড বইয়ের বৈশিষ্ট্যঃ\r\n\r\n  জব’স পাসওয়ার্ড বইয়ে চাকরির প্রস্তুতির সকল বিষয়ের (বাংলা, ইংরেজি, সাধারণ জ্ঞান, গণিত, বিজ্ঞান ও কম্পিউটার) প্রয়োজনীয় সকল তথ্য সংযোজন করা হয়েছে।\r\nজব’স পাসওয়ার্ড বই পড়েই প্রায় সকল সরকারি চাকরির প্রস্ততি সম্ভব। \r\nচাকরির পরীক্ষার জন্য বিষয়ভিত্তিক সর্বনিম্ন ৭০%-৮০% কমনের টার্গেট নিয়ে বইটি আপডেট করা হয়েছে। \r\n১৯৯৯-২০২২ সালের চাকরির পরীক্ষার প্রশ্নের সমাধান বিশ্লেষণ করে বইটি আপডেট করা হয়েছে। \r\nপ্রতিটা অধ্যায়ের গুরুত্বপূর্ণ প্রশ্ন এবং শর্ট সাজেশন আপডেট করা হয়েছে। \r\nপড়ার বিশেষ কৌশল উপস্থাপন এবং সহজ বিশ্লেষণ ও আলোচনা সংযুক্ত করা হয়েছে। \r\nরিভিশন কৌশল আলাদা (অনেক কম সময়ে রিভিশন করা সম্ভব)। \r\nপ্রতিটা অধ্যায়ের জন্য গুরুত্বপূর্ণ টিপস সংযুক্ত করা হয়েছে। \r\nপ্রতিটা অধ্যায়ের উপরে গবেষণা করে পরীক্ষায় আসার মত সকল প্রশ্ন সংযোজন করা হয়েছে। \r\nবইটি পড়ে শেষ করার জন্য রুটিন এবং প্রতিদিনের পরীক্ষার ব্যবস্থা সংযুক্ত করা হয়েছে। \r\nঅনলাইনে অধ্যায় ভিত্তিক মডেল টেস্ট, প্র্যাকটিস টেস্ট ও ডেইলি টেস্টের ব্যবস্থা করা হয়েছে। \r\nপ্রতিটা অধ্যায়ের উপরে ভিডিও ক্লাস সংযুক্ত থাকবে। \r\nজব’স পাসওয়ার্ড বই পড়েই প্রায় সকল সরকারি চাকরির প্রস্তুতি সম্ভব।\r\nপ্রধান বৈশিষ্ট্যঃ একসাথে সকল সরকারি চাকরির প্রস্তুতি নিতে পারবেন তাও আবার ১০০ দিনের পড়ার রুটিন অনুযায়ী ।     </p>",
      price: "395.00",
      sale_price: "430.00",
      stock: 200,
      status: true,
      images: '"[\\"products/4942465618iatlkav.jpg\\"]"',
      category_id: 8,
      user_id: 12,
      brand_id: 2,
      sub_category_id: 8,
      special_price: null,
      owner: "import-7662",
      added_by: "importer",
      sizes: '"[]"',
      colors: '"[]"',
      special_price_type: null,
      special_price_start: null,
      special_price_end: null,
      createdAt: "2024-03-09T10:41:53.000Z",
      updatedAt: "2024-03-26T06:41:28.000Z",
      deletedAt: null,
      reviews: [],
    };
    //etag managed
    const ifNoneMatch = req.get("If-None-Match");
    console.log("version tag", cachedDataVersionTag());
    console.log("current etag", res.get("ETag"));
    console.log("client send", ifNoneMatch);
    if (ifNoneMatch && ifNoneMatch === res.get("ETag")) {
      return res.status(304).end();
    }

    res.status(200).json({
      success: {
        message: "Data Fetch successfully.",
        data: data,
      },
    });
  } catch (error) {
    next(error);
  }
}

export { apiHealth, testData };
