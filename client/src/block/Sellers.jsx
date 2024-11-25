import {sellersList} from '../service/dataBlock'

export function Sellers () {
    return (
        <div>
            {sellersList.map(seller => (
                <div key={seller.id} className="flex-grow py-2 gap-">
                    Должность: {seller.title} Имя: {seller.name} {seller.id}
                </div>
            ))}
        </div>
    );
}