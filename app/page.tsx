import { Round } from '@/components/Round';
import { isHoleId } from '@/lib/round';

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Home({ searchParams }: Props) {
  const { hole } = await searchParams;
  return <Round initialHole={isHoleId(hole) ? hole : null} />;
}
