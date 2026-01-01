
//edit page 

import EditPage from "@/app/components/EditPage";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Edit product | eComAdmin",
  description: "Update products details ",
};

// import { useParams } from 'next/navigation'
export default function AddProductForm({ params }) {
    // const router = useRouter();

    const { id } = params;
    return (
        <EditPage id={id}/>
    )

    
}
