import React, { useState } from 'react';
import axios from 'axios';

interface Dimensions {
    width: number;
    height: number;
    depth: number;
    dimensionUnit: string;
}

interface ImageSize {
    width: number;
    height: number;
}

interface PaintingImage {
    imageUrl: string;
    imageSize: ImageSize;
}

interface PaintingForm {
    id: string;
    name: string;
    dimensions: Dimensions;
    price: number;
    artistId: string;
    paintingImages: PaintingImage[];
    state: 'ACTIVE' | 'INACTIVE';
}

const CreatePaintingForm: React.FC = () => {
    const [formData, setFormData] = useState<PaintingForm>({
        id: '',
        name: '',
        dimensions: {
            width: 0,
            height: 0,
            depth: 0,
            dimensionUnit: 'METERS',
        },
        price: 0,
        artistId: '',
        paintingImages: [
            {
                imageUrl: '',
                imageSize: {
                    width: 0,
                    height: 0,
                },
            },
        ],
        state: 'ACTIVE',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name.startsWith('paintingImages')) {
            const match = name.match(/paintingImages\[(\d+)\]\.(\w+)(?:\.(\w+))?/);
            if (match) {
                const [, index, key, subkey] = match;
                setFormData((prevData) => {
                    const images = [...prevData.paintingImages];
                    if (subkey) {
                        (images[+index] as any)[key][subkey] = value;
                    } else {
                        (images[+index] as any)[key] = value;
                    }
                    return { ...prevData, paintingImages: images };
                });
            }
        } else if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData((prevData) => ({
                ...prevData,
                parent: {
                    ...(prevData[parent as keyof PaintingForm] as object),
                    [child]: value,
                },
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const addImage = () => {
        setFormData((prevData) => ({
            ...prevData,
            paintingImages: [
                ...prevData.paintingImages,
                {
                    imageUrl: '',
                    imageSize: {
                        width: 0,
                        height: 0,
                    },
                },
            ],
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/paintings', formData);
            alert('Painting created successfully!');
            console.log(response.data);
        } catch (error) {
            console.error('Error creating painting:', error);
            alert('Failed to create painting.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create Painting</h1>
            <label>
                ID:
                <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <h3>Dimensions</h3>
            <label>
                Width:
                <input
                    type="number"
                    name="dimensions.width"
                    value={formData.dimensions.width}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <label>
                Height:
                <input
                    type="number"
                    name="dimensions.height"
                    value={formData.dimensions.height}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <label>
                Depth:
                <input
                    type="number"
                    name="dimensions.depth"
                    value={formData.dimensions.depth}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <label>
                Dimension Unit:
                <input
                    type="text"
                    name="dimensions.dimensionUnit"
                    value={formData.dimensions.dimensionUnit}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <label>
                Price:
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <label>
                Artist ID:
                <input
                    type="text"
                    name="artistId"
                    value={formData.artistId}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <h3>Painting Images</h3>
            {formData.paintingImages.map((image, index) => (
                <div key={index}>
                    <label>
                        Image URL:
                        <input
                            type="text"
                            name={`paintingImages[${index}].imageUrl`}
                            value={image.imageUrl}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Image Width:
                        <input
                            type="number"
                            name={`paintingImages[${index}].imageSize.width`}
                            value={image.imageSize.width}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Image Height:
                        <input
                            type="number"
                            name={`paintingImages[${index}].imageSize.height`}
                            value={image.imageSize.height}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                </div>
            ))}
            <button type="button" onClick={addImage}>Add Another Image</button>
            <br />
            <label>
                State:
                <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                </select>
            </label>
            <br />
            <button type="submit">Create Painting</button>
        </form>
    );
};

export default CreatePaintingForm;