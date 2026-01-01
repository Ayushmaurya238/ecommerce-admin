import NewProduct from "@/app/components/NewProduct";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Add Product | eComAdmin",
  description: "Add new product for sale on eComAdmin  ",
};

export default function AddProductForm() {
    
    return(
        <NewProduct/>
    )
}
