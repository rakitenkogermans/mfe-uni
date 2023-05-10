import {useParams} from "react-router-dom";
import {ProductDetails} from "./ProductDetails";

const ProductDetailsPage = () => {
    const { id } = useParams();

    if (!id) {
        return <p>Product not found</p>
    }

    return (
        <div>
            <ProductDetails id={id} />
        </div>
    );
};

export { ProductDetailsPage };
