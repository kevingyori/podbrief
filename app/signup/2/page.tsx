'use client';
import EditOrSub from "@/components/EditOrSub";
import { Provider } from "jotai";

function Page() {
  return (
    <Provider>
      <div className="md:mx-auto md:max-w-xl">
        <EditOrSub type="sub" />
      </div>
    </Provider>
  );
}

export default Page;
