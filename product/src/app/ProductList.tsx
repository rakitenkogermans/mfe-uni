import './styles/index.scss'
import ProductCard, {Product} from "./ProductCard";

const products: Product[] = [
    {
        "id": 1,
        "name": "Alienware M15 R5",
        "price": 1999,
        "description": "15.6-inch gaming laptop with 144Hz display",
        "image": "https://th.dellexperience.co/wp-content/uploads/2021/09/Dell_Q3FY22_Microsite_Alienware-M15-R5-01.png",
        "types": [
            "gaming",
            "ultrabook"
        ]
    },
    {
        "id": 2,
        "name": "Dell XPS 13",
        "price": 1099,
        "description": "13.3-inch ultrabook with 4K display",
        "image": "https://th.dellexperience.co/wp-content/uploads/2021/09/Dell_Q3FY22_Microsite_Alienware-M15-R5-01.png",
        "types": [
            "ultrabook"
        ]
    },
    {
        "id": 3,
        "name": "Lenovo ThinkPad X1 Carbon",
        "price": 1699,
        "description": "14-inch business laptop with 4G LTE",
        "image": "https://th.dellexperience.co/wp-content/uploads/2021/09/Dell_Q3FY22_Microsite_Alienware-M15-R5-01.png",
        "types": [
            "business"
        ]
    },
    {
        "id": 4,
        "name": "HP Envy x360",
        "price": 899,
        "description": "13.3-inch 2-in-1 laptop with AMD Ryzen 7 processor",
        "image": "https://th.dellexperience.co/wp-content/uploads/2021/09/Dell_Q3FY22_Microsite_Alienware-M15-R5-01.png",
        "types": [
            "2in1"
        ]
    },
];

interface ProductListProps {
    className?: string;
}

const ProductList = ({ className }: ProductListProps) => {
    return (
        <div className="grid grid-cols-3 gap-4">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;
