import hrOne from "../assets/users/hr1.png";
import hrTwo from "../assets/users/hr2.png";
import userOne from "../assets/users/user1.png";
import userTwo from "../assets/users/user2.png";
import "./style.css";

const AuthRightHalf = ({ authSvg, type }) => {
  const testimonials = [
    {
      text: "HireUp helped me find the perfect candidates within days. It’s so easy to use!",
      name: "Priya Sharma",
      role: "HR Manager, TechCorp",
      img: hrTwo,
      type: "employer",
    },

    {
      text: "I could review applications in one place and hire the right candidates faster than ever!",
      name: "Arjun Mehta",
      role: "Talent Acquisition Lead, Innovate Inc.",
      img: hrOne,
      type: "employer",
    },
    {
      text: "As a job seeker, HireUp was a lifesaver. The process was seamless and efficient.",
      name: "Akhil Kumar",
      role: "Software Engineer",
      img: userTwo,
      type: "employee",
    },

    {
      text: "Thanks to HireUp, I landed a role in one of the best companies in the industry. The user-friendly interface made job hunting stress-free.",
      name: "Anjali Ganesh",
      role: "UI/UX Designer",
      img: userOne,
      type: "employee",
    },
  ];

  const filteredTestimonals = testimonials.filter(
    (testimonial) => testimonial.type === type
  );

  console.log(filteredTestimonals);
  return (
    <div className="flex flex-col justify-center items-center p-6 h-screen bg-cover bg-center auth-right">
      {/* SVG Section */}
      {/* <div className="flex justify-center items-center mb-6">
        <img src={authSvg} alt="svg" className="w-3/4 max-w-md" />
      </div> */}

      {/* Testimonial Section */}
      <div className="space-y-4 w-full px-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <p className="text-gray-700 italic">“{testimonial.text}”</p>
            <div className="flex items-center mt-3">
              <div className="w-12 h-12 rounded-full bg-blue-300 flex justify-center items-center text-white font-bold">
                <img
                  src={testimonial.img}
                  className="rounded-full h-full w-full object-cover"
                  alt="user-profile"
                />
              </div>
              <div className="ml-3">
                <h4 className="font-semibold text-gray-800">
                  {testimonial.name}
                </h4>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthRightHalf;
