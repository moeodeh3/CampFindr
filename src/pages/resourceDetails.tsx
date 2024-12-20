import { useRouter } from 'next/router';
import { Header } from 'src/components/home/header';
import ResourceDetailsWithQuery from 'src/components/resourceDetails/resource-details-query';

export default function ResourceDetailsPage() {
  const router = useRouter();

  const { mapId } = router.query;

  const mapIdNumber = mapId ? Number(mapId) : null;

  return (
    <div className="flex min-h-screen bg-background overflow-x-hidden">
      <main className="min-h-full w-full space-y-8">
        <Header />
        <div className="flex min-h-full w-full">
          <ResourceDetailsWithQuery mapId={mapIdNumber} />
        </div>
      </main>
    </div>
  );
}
