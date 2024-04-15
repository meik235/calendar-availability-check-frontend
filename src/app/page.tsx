import { use } from "react";
import { MIDDLEWARE } from "../constants/constants";
import ApiUrls from "../network/apiUrls";
import HomePage from "./home";

const getExpertList = async () => {
	const res = await fetch(`${MIDDLEWARE}${ApiUrls.GET_EXPERT_LIST}`, {
		cache: "no-store",
	});
	if (!res.ok) {
		return [];
	}
	const expertList = await res?.json();
	return expertList;
};

export default function Home() {
	const expertListData = use(getExpertList());
	return (
		<main className='flex min-h-screen flex-col items-center justify-between py-24 px-6'>
			<HomePage expertListData={expertListData} />
		</main>
	);
}
