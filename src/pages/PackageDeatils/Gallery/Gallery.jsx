
import '../../../assets/css/Gallery.css';

const Gallery = ({ images }) => {
    return (
        <div className="gallery">
            {images.map((image, index) => (
                <div key={index} className="gallery-item">
                    <img src={image} alt={`Tourist spot ${index + 1}`} />
                </div>
            ))}
        </div>
    );
};

export default Gallery;
