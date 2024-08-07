import { Helmet } from "react-helmet-async";

export default function Seo({ title, description }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:type" content={"article"} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      <meta name="twitter:creator" content={"Pi Mall"} />
      <meta name="twitter:card" content={"article"} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
