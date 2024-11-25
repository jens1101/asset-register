import type { AssetData } from "./asset.data.js";
import { type Component, Suspense } from "solid-js";

export const Asset: Component<{ data: AssetData }> = ({ data: asset }) => {
  return (
    <section>
      <h1>View asset</h1>

      <Suspense fallback={<span>...</span>}>
        <pre>{asset()}</pre>
      </Suspense>
    </section>
  );
};
