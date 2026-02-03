import { Router } from "express";
import { AuthRouter } from "../module/authentication/auth.rought";
import { MailRouter } from "../module/mails/mail.route";
import { BlogRouter } from "../module/blogs/blog.route";
import { PortfolioRouter } from "../module/portfolio/portfolio.route";
import { CaseStudyRouter } from "../module/caseStudy/caseStudy.route";
import { ProductRouter } from "../module/product/product.route";
import { CareerRouter } from "../module/career/career.route";
import { ServiceRouter } from "../module/service/service.route";
import { AnalyticsRouter } from "../module/analytics/analytics.route";

const router = Router()

const moduleRought = [
    {
        path: '/auth',
        route: AuthRouter
    },
    {
        path: '/mail',
        route: MailRouter
    },
    {
        path: '/blogs',
        route: BlogRouter
    },
    {
        path: '/portfolio',
        route: PortfolioRouter
    },
    {
        path: '/case-studies',
        route: CaseStudyRouter
    },
    {
        path: '/products',
        route: ProductRouter
    },
    {
        path: '/careers',
        route: CareerRouter
    },
    {
        path: '/services',
        route: ServiceRouter
    },
    {
        path: '/analytics',
        route: AnalyticsRouter
    }
]

moduleRought.forEach((route) => router.use(route.path, route.route))

export const Routers = router
