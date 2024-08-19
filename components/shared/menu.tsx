import MenuList from "./menu-list";

export default function Menu() {
  return (
    <div className="bg-white w-full">
      <MenuList
        logo="vehicle.png"
        href="/category/vehicles"
        title="Vehicles"
        keyword="vehicles"
      />
      <MenuList
        logo="real-estate.png"
        href="/category/property"
        title="Property"
        keyword="property"
      />
      <MenuList
        logo="mobile.png"
        href="/category/mobile"
        title="Mobile Phones & Tablets"
        keyword="mobile"
      />
      <MenuList
        logo="electronics.png"
        href="/category/electronics"
        title="Computers & Electronics"
        keyword="electronics"
      />
      <MenuList
        logo="home.png"
        href="/category/furniture"
        title="Home, Furniture & Appliances"
        keyword="furniture"
      />
      <MenuList
        logo="beauty.png"
        href="/category/health"
        title="Health & Beauty"
        keyword="health"
      />
      <MenuList
        logo="fashion.png"
        href="/category/fashion"
        title="Fashion"
        keyword="fashion"
      />
      <MenuList
        logo="hobbies.png"
        href="/category/sports"
        title="Sports, Arts & Outdoors"
        keyword="sports"
      />
      <MenuList
        logo="https://assets.jiji.ng/art/attributes/categories/jobseekers.png"
        href="/category/work"
        title="Seeking Work CVs"
        keyword="work"
      />
      <MenuList
        logo="https://assets.jiji.ng/art/attributes/categories/services.png"
        href="/category/services"
        title="Services"
        keyword="services"
      />
      <MenuList
        logo="https://assets.jiji.ng/art/attributes/categories/jobs.png"
        href="/category/jobs"
        title="Jobs"
        keyword="jobs"
      />
      <MenuList
        logo="https://assets.jiji.ng/art/attributes/categories/babies.png"
        href="/category/kids"
        title="Babies & Kids"
        keyword="kids"
      />
      <MenuList
        logo="https://assets.jiji.ng/art/attributes/categories/animals.png"
        href="/category/animals"
        title="Animals & Pets"
        keyword="property"
      />
      <MenuList
        logo="https://assets.jiji.ng/art/attributes/categories/agriculture.png"
        href="/category/agriculture"
        title="Agriculture & Food"
        keyword="agriculture"
      />
      <MenuList
        logo="https://assets.jiji.ng/art/attributes/categories/equipment.png"
        href="/category/equipment"
        title="Commercial Equipment & Tools"
        keyword="equipment"
      />
      <MenuList
        logo="https://assets.jiji.ng/art/attributes/categories/repair.png"
        href="/category/construction"
        title="Repair & Construction"
        keyword="construction"
      />
    </div>
  );
}
