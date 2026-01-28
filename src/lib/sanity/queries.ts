/**
 * GROQ queries for Sanity CMS
 */

// Language filter helper
const languageFilter = (locale: string) =>
  `language == "${locale}" || !defined(language)`;

/**
 * Get all partners with localized content
 */
export const partnersQuery = (locale: string) => `
  *[_type == "partner" && ${languageFilter(locale)}] | order(featured desc, name asc) {
    _id,
    name,
    slug,
    description,
    category,
    logo,
    website,
    phone,
    email,
    address,
    location,
    featured,
    socialLinks,
    operatingHours
  }
`;

/**
 * Get a single partner by slug
 */
export const partnerBySlugQuery = (locale: string) => `
  *[_type == "partner" && slug.current == $slug && ${languageFilter(locale)}][0] {
    _id,
    name,
    slug,
    description,
    longDescription,
    category,
    logo,
    images,
    website,
    phone,
    email,
    address,
    location,
    featured,
    socialLinks,
    operatingHours,
    amenities,
    priceRange
  }
`;

/**
 * Get partners by category
 */
export const partnersByCategoryQuery = (locale: string) => `
  *[_type == "partner" && category == $category && ${languageFilter(locale)}] | order(featured desc, name asc) {
    _id,
    name,
    slug,
    description,
    category,
    logo,
    website,
    phone,
    featured
  }
`;

/**
 * Get featured partners for homepage
 */
export const featuredPartnersQuery = (locale: string) => `
  *[_type == "partner" && featured == true && ${languageFilter(locale)}] | order(name asc)[0...6] {
    _id,
    name,
    slug,
    description,
    category,
    logo,
    website
  }
`;

/**
 * Get all guide articles
 */
export const guidesQuery = (locale: string) => `
  *[_type == "guide" && ${languageFilter(locale)}] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    category,
    featuredImage,
    publishedAt,
    readTime,
    author
  }
`;

/**
 * Get a single guide by slug
 */
export const guideBySlugQuery = (locale: string) => `
  *[_type == "guide" && slug.current == $slug && ${languageFilter(locale)}][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    category,
    featuredImage,
    publishedAt,
    updatedAt,
    readTime,
    author,
    seo,
    relatedGuides[]->{
      _id,
      title,
      slug,
      excerpt,
      category,
      featuredImage
    }
  }
`;

/**
 * Get guides by category
 */
export const guidesByCategoryQuery = (locale: string) => `
  *[_type == "guide" && category == $category && ${languageFilter(locale)}] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    category,
    featuredImage,
    publishedAt,
    readTime
  }
`;

/**
 * Get all FAQ items
 */
export const faqsQuery = (locale: string) => `
  *[_type == "faqItem" && ${languageFilter(locale)}] | order(category, order asc) {
    _id,
    question,
    answer,
    category
  }
`;

/**
 * Get FAQs by category
 */
export const faqsByCategoryQuery = (locale: string) => `
  *[_type == "faqItem" && category == $category && ${languageFilter(locale)}] | order(order asc) {
    _id,
    question,
    answer
  }
`;

/**
 * Get homepage blocks
 */
export const homepageBlocksQuery = (locale: string) => `
  *[_type == "homepageBlock" && ${languageFilter(locale)}] | order(order asc) {
    _id,
    blockType,
    title,
    subtitle,
    content,
    image,
    cta,
    order
  }
`;

/**
 * Get all categories
 */
export const categoriesQuery = (locale: string) => `
  *[_type == "category" && ${languageFilter(locale)}] | order(order asc) {
    _id,
    name,
    slug,
    description,
    icon,
    parentCategory
  }
`;

/**
 * Site settings
 */
export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    siteName,
    siteDescription,
    logo,
    socialLinks,
    contactEmail,
    contactPhone,
    address
  }
`;
