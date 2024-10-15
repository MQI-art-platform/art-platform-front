// Don't forget to
// // download the CSS file too OR 
// // remove the following line if you're already using Tailwind 
import "./PersonalAccount.css";

export const PersonalAccount = () => {
  return (
    <div id="webcrumbs"> 
    	<div className="w-full max-w-[1200px] min-h-[800px] bg-white rounded-lg shadow-lg p-8 mx-auto">
    	  {/* Account Timetable Section */}
    	  <section className="mb-8">
    	    <h1 className="text-2xl font-title mb-4">Personal Timetable</h1>
    	
    	    {/* Controls: Month/Year Switcher */}
    	    <div className="flex flex-wrap justify-between items-center mb-6 space-y-4 sm:space-y-0">
    	      <div className="flex flex-wrap space-x-2 items-center">
    	        <button className="rounded-full bg-primary-500 text-white font-semibold px-4 py-2">Previous Month</button>
    	        <span className="text-xl">September 2023</span> {/* Could be dynamic */}
    	        <button className="rounded-full bg-primary-500 text-white font-semibold px-4 py-2">Next Month</button>
    	      </div>
    	      <select className="rounded-md border border-neutral-300 px-4 py-2">
    	        <option>Monthly Mode</option>
    	        <option>Daily Mode</option>
    	      </select>
    	    </div>
    	
    	    {/* Monthly Overview */}
    	    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 text-center">
    	      {Array.from({ length: 30 }).map((_, index) => (
    	        <button key={index} className="bg-neutral-100 p-4 rounded-md relative">
    	          <span className="block">{index + 1}</span>
    	          {index === 2 && <span className="absolute top-2 right-2 bg-primary-500 h-[8px] w-[8px] rounded-full"></span>}
    	        </button>
    	      ))}
    	    </div>
    	
    	    {/* Daily Mode - Meeting List */}
    	    <div className="mt-6">
    	      <h2 className="text-xl font-semibold mb-2">Meetings on September 22, 2023</h2>
    	      <div className="relative">
    	        {/* Time Scale */}
    	        <div className="absolute left-0">
    	          {Array.from({ length: 12 }).map((_, index) => (
    	            <span key={index} className="block h-[60px] leading-[60px] text-neutral-500">{8 + index}:00</span>
    	          ))}
    	        </div>
    	
    	        {/* Meetings */}
    	        <div className="ml-12">
    	          <div className="p-4 bg-neutral-100 rounded-md mb-2">
    	            <span className="block font-semibold">10:00 - John Doe</span>
    	            <a href="#" className="text-primary-500 underline">Join Meeting</a>
    	          </div>
    	          <div className="p-4 bg-neutral-100 rounded-md mb-2">
    	            <span className="block font-semibold">14:00 - Jane Smith</span>
    	            <a href="#" className="text-primary-500 underline">Join Meeting</a>
    	          </div>
    	        </div>
    	      </div>
    	    </div>
    	  </section>
    	
    	  {/* Order History Section */}
    	  <section>
    	    <h1 className="text-2xl font-title mb-4">Order History</h1>
    	
    	    {/* Orders List */}
    	    <details className="mb-4 p-4 bg-neutral-100 rounded-md">
    	      <summary className="cursor-pointer">
    	        <div className="flex flex-wrap justify-between items-center">
    	          <h2 className="text-xl font-semibold">Order #4531</h2>
    	          <div className="text-right">
    	            <span className="block">Total: $250</span>
    	            <span className="block text-neutral-500">Status: Delivered</span>
    	          </div>
    	        </div>
    	      </summary>
    	      {/* Collapsible Order Details */}
    	      <div className="mt-4">
    	        <p className="mb-2 text-neutral-700">Delivery Address: 123 Main St, Cityville</p>
    	        <p className="mb-2 text-neutral-700">Delivery Type: Standard Shipping</p>
    	
    	        <div className="space-y-4">
    	          <div className="flex flex-wrap items-start space-x-4 p-4 bg-neutral-50 rounded-xs">
    	            <img
    	              src="https://tools-api.webcrumbs.org/image-placeholder/100/100/painting/1"
    	              width={100}
    	              height={100}
    	              className="object-cover rounded-md"
    	              alt="Painting"
    	            />
    	            <div className="flex-1">
    	              <h3 className="font-semibold">Abstract Painting</h3>
    	              <p className="text-neutral-500">18 x 24 in, Oil on canvas</p>
    	              <p className="font-semibold">$150</p>
    	            </div>
    	          </div>
    	
    	          <div className="flex flex-wrap items-start space-x-4 p-4 bg-neutral-50 rounded-xs">
    	            <img
    	              src="https://tools-api.webcrumbs.org/image-placeholder/100/100/painting/2"
    	              width={100}
    	              height={100}
    	              className="object-cover rounded-md"
    	              alt="Painting"
    	            />
    	            <div className="flex-1">
    	              <h3 className="font-semibold">Modern Portrait</h3>
    	              <p className="text-neutral-500">24 x 36 in, Acrylic on canvas</p>
    	              <p className="font-semibold">$100</p>
    	            </div>
    	          </div>
    	        </div>
    	      </div>
    	    </details>
    	
    	    {/* Another order example */}
    	    <details className="mb-4 p-4 bg-neutral-100 rounded-md">
    	      <summary className="cursor-pointer">
    	        <div className="flex flex-wrap justify-between items-center">
    	          <h2 className="text-xl font-semibold">Order #4522</h2>
    	          <div className="text-right">
    	            <span className="block">Total: $360</span>
    	            <span className="block text-neutral-500">Status: Processing</span>
    	          </div>
    	        </div>
    	      </summary>
    	      <div className="mt-4">
    	        <p className="mb-2 text-neutral-700">Delivery Address: 456 Elm St, Another City</p>
    	        <p className="mb-2 text-neutral-700">Delivery Type: Express Shipping</p>
    	
    	        <div className="space-y-4">
    	          <div className="flex flex-wrap items-start space-x-4 p-4 bg-neutral-50 rounded-xs">
    	            <img
    	              src="https://tools-api.webcrumbs.org/image-placeholder/100/100/painting/3"
    	              width={100}
    	              height={100}
    	              className="object-cover rounded-md"
    	              alt="Painting"
    	            />
    	            <div className="flex-1">
    	              <h3 className="font-semibold">Watercolor Landscape</h3>
    	              <p className="text-neutral-500">12 x 16 in, Watercolor on paper</p>
    	              <p className="font-semibold">$80</p>
    	            </div>
    	          </div>
    	
    	          <div className="flex flex-wrap items-start space-x-4 p-4 bg-neutral-50 rounded-xs">
    	            <img
    	              src="https://tools-api.webcrumbs.org/image-placeholder/100/100/painting/4"
    	              width={100}
    	              height={100}
    	              className="object-cover rounded-md"
    	              alt="Painting"
    	            />
    	            <div className="flex-1">
    	              <h3 className="font-semibold">Cityscape</h3>
    	              <p className="text-neutral-500">30 x 40 in, Mixed Media</p>
    	              <p className="font-semibold">$280</p>
    	            </div>
    	          </div>
    	        </div>
    	      </div>
    	    </details>
    	  </section>
    	</div> 
    </div>
  )
}

