import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/api/",
                    "/dashboard/",
                    "/admin/",
                    "/sign-in",
                    "/sign-up",
                    "/reset-password",
                ],
            },
        ],
        sitemap: "https://monkbot.app/sitemap.xml",
        host: "https://monkbot.app",
    };
}
