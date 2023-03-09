import { PrimaryLayout } from "../layouts/PrimaryLayout";

type DraftPageProps = {
  id: string;
};

export function DraftPage({ id }: DraftPageProps) {
  return (
    <PrimaryLayout>
      <h1 class="text-3xl">Draft Page</h1>
      <p>Draft ID: {id}</p>
    </PrimaryLayout>
  );
}
