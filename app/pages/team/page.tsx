import Breadcrumb from "@/app/components/Breadcrumb";
import { RiArrowRightSLine, RiHome2Line } from "@remixicon/react";

const Team = () => {
  return (
    <div className="my-5">
      <h1>Team page</h1>
      <h1 className="text-display-sm text-primary-400">Breadcrumbs</h1>
      <Breadcrumb
        homeElement={<RiHome2Line size={18} />}
        separator={
          <span>
            <RiArrowRightSLine size={18} color="gray" />
          </span>
        }
        activeClasses="bg-gray-200"
        containerClasses="flex gap-[6px] items-center"
        listClasses="hover:bg-gray-100 rounded-lg py-[6px] px-3 text-text-xs font-semibold font-bold cursor-pointer"
        capitalizeLinks
      />
    </div>
  );
};

export default Team;
