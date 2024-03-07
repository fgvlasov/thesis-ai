import { MessageSquare } from "lucide-react";
import { Heading } from "@/components/heading";


const ThesisesPage = () => {
  	return (
		<div>
			<Heading
			title="Generate Thesis"
			description="Our most advanced thesis generation model."
			icon={MessageSquare}
			iconColor="text-violet-500"
			bgColor="bg-violet-500/10"
			/>
		</div>
	);
}

export default ThesisesPage;