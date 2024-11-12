import { useRouter } from "next/router";
import { Header } from "src/components/home/header";
import ResourceDetailsWithQuery from "src/components/resourceDetails/resource-details-query";

export default function ResourceDetails() {
  const router = useRouter();

  const { mapId } = router.query;
  const mapIdNumber = mapId ? Number(mapId) : null;

  //const [resourceDetails, setResourceDetails] = useState<ResourceLocation | null>(null);

  return (
    <div className="min-h-screen h-full bg-background overflow-x-hidden">
      <main className="h-full space-y-8">
        <Header />
        <ResourceDetailsWithQuery mapId={mapIdNumber} />
      </main>
    </div>
  );
}
