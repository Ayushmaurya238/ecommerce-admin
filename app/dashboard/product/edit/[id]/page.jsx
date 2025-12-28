
//edit page 

import EditPage from "@/app/components/EditPage";



// import { useParams } from 'next/navigation'
export default function AddProductForm({ params }) {
    // const router = useRouter();

    const { id } = params;
    return (
        <EditPage id={id}/>
    )

    
}
