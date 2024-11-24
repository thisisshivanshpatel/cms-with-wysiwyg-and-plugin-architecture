import { CreateForm } from "@/components";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  return (
    <>
      <CreateForm isEdit slug={slug} />
    </>
  );
}