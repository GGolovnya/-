import {productsList} from "../service/dataBlock"

export function Products () {
    return (
        <div>
            {productsList.map(product => (
                <div key={product.id}>
                    {product.title}
                </div>
            ))}
        </div>
    );
}