import { useEffect, useState } from "react";
import { CreateReviewRequest, Painting, PaintingState, Review, ReviewRating } from "../client/platform.models";
import { useApiClient } from "../client/platform.api.context";
import { useSearchParams } from "react-router-dom";
import { useSession } from "../session/session.context";
import CartManager from "../session/cart.manager";

const PaintingPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const paintingId = searchParams.get("id");
    const [painting, setPainting] = useState<Painting | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [newReview, setNewReview] = useState<string>('');
    const [newRating, setNewRating] = useState<ReviewRating | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const apiClient = useApiClient()
    const { user } = useSession()

    // Fetch painting data and reviews using apiClient
    useEffect(() => {
        if (!paintingId) {
            setError("Painting with id not found")
            return
        }
        const fetchPainting = async () => {
            try {
                setLoading(true);
                // Fetch painting details

                await apiClient.getPaintingById(paintingId)
                    .then((it) => setPainting(it.data))

                await apiClient.getReviews(paintingId)
                    .then((it) => setReviews(it.data))

                setLoading(false);
            } catch (error: any) {
                setLoading(false);
                setError('Error fetching painting details');
                console.error(error);
            }
        };

        fetchPainting();
    }, [paintingId]);

    // Handle adding painting to cart
    const handleAddToCart = () => {
        if (painting) {
            const result = CartManager.addCartItem(painting.id)
            if (result == true) {
                alert('Added to cart!');
            } else {
                alert('You already have this item in cart')
            }
        }
    };

    // Handle submitting a new review
    const handleReviewSubmit = async () => {
        if (newReview.trim() && newRating && painting) {
            try {
                // Send new review to API
                const reviewRequest: CreateReviewRequest = {
                    customerId: user,
                    rating: newRating,
                    content: newReview,
                    paintingId: painting.id
                };
                await apiClient.createReview(reviewRequest)
                    .then(response => {
                        setReviews([...reviews, response.data]);
                    }).catch(err => {
                        if (err.response.status == 400) {
                            alert("You already posted review on this painting");
                            setNewReview('');
                            setNewRating(null);
                        }
                        else {
                            alert("Something went wrong")
                        }
                    });

            } catch (error) {
                console.error('Error submitting review:', error);
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            {painting ? (
                <>
                    <div className="text-center space-y-8">
                        <div className="text-center space-y-4">
                            <h1 className="text-3xl font-bold">{painting.name}</h1>
                            <div className="flex justify-center space-x-4 h-[50vh]">
                                {painting.paintingImages.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image.imageUrl}
                                        alt={painting.name}
                                        className="object-fit rounded-md"
                                    />
                                ))}
                            </div>
                            <p className="text-xl font-semibold mt-4">{painting.price} руб</p>
                        </div>

                        {(painting.state == PaintingState.ACTIVE)
                            ? (
                                <button
                                    onClick={handleAddToCart}
                                    className="bg-blue-600 text-white py-2 px-6 rounded-full mt-6 hover:bg-blue-700"
                                >
                                    Buy
                                </button>
                            )
                            : (<div> Sold </div>)
                        }

                        {/* Reviews Section */}
                        <div className="w-full space-y-4 mt-8">
                            <h2 className="text-2xl font-semibold">Reviews</h2>
                            <div className="space-y-2">
                                {reviews.length > 0 ? (
                                    reviews.map((review, index) => (
                                        <div key={index} className="p-4 border border-gray-300 rounded-lg">
                                            <div className="flex items-center mb-2">
                                                {/* Displaying star rating for each review */}
                                                {[...Array(5)].map((_, i) => (
                                                    <span
                                                        key={i}
                                                        className={`material-symbols-outlined text-yellow-500 ${i < review.rating.valueOf() ? 'symbol-filled' : ''}`}
                                                    >
                                                        star
                                                    </span>
                                                ))}
                                            </div>
                                            <p>{review.content}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No reviews yet.</p>
                                )}
                            </div>
                        </div>

                        {/* New Review Section */}
                        <div className="w-full mt-6">
                            <h2 className="text-xl font-semibold mb-4">Write your review</h2>

                            {/* Star Rating Input for New Review */}
                            <div className="flex items-center mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <span
                                        key={i}
                                        onClick={() => setNewRating(i + 1)}
                                        className={`cursor-pointer material-symbols-outlined text-yellow-500 ${i < (newRating ? newRating : 0) ? 'symbol-filled' : ''}`}
                                    >
                                        star
                                    </span>
                                ))}
                            </div>

                            <textarea
                                value={newReview}
                                onChange={(e) => setNewReview(e.target.value)}
                                rows={4}
                                className="w-full p-4 border border-gray-300 rounded-lg"
                                placeholder="Write your review here..."
                            ></textarea>
                            <button
                                onClick={handleReviewSubmit}
                                className="bg-green-600 text-white py-2 px-6 rounded-full mt-4 hover:bg-green-700"
                            >
                                Submit Review
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <p>No painting found</p>
            )}
        </div>
    );
};

export default PaintingPage;