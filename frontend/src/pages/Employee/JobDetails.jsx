import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import {
  getJobDetailsThunk,
  getJobStatusThunk,
  jobApplyThunk,
} from "../../redux/reducers/jobDetails";

const statusColors = {
  Applied: "#7ec8e3", // Lighter Blue
  Shortlisted: "#ffd56b", // Lighter Yellow
  Rejected: "#f85a5a", // Lighter Red
  Accepted: "#81c784", // Lighter Green
};

const JobDetails = () => {
  const dispatch = useDispatch();
  const { jobId } = useParams();

  //!fetch job details
  useEffect(() => {
    dispatch(getJobDetailsThunk(jobId));
  }, [dispatch, jobId]);

  const {
    loading,
    jobPageData: job, //after fetching in useEffect we can get it using redux
    appliedJobs,
    currentJobStatus: status,
  } = useSelector((state) => state.jobDetails);

  console.log("applied jobs", appliedJobs);
  console.log(job);

  const employee_id = localStorage.getItem("employee_id");

  const isAlreadyApplied = appliedJobs?.includes(jobId);

  //!fetch job status

  useEffect(() => {
    dispatch(
      getJobStatusThunk({
        job_id: jobId,
        employee_id: employee_id,
      })
    );
  }, [dispatch]);

  //!handle job apply
  function handleApply() {
    dispatch(jobApplyThunk(jobId));
  }

  if (loading) {
    return <Loader />;
  }

  // if (error) {
  //   return <h1>Error During Fetching Job Details</h1>;
  // }

  // const job = {
  //   _id: "67877141a67c9a439575c423",
  //   company_name: "google",
  //   title: "software developer engineer",
  //   description:
  //     "de Finibus Bonorum et Malorum, written by Cicero in 45 BC At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.1914 translation by H. Rackham On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.",
  //   employment_type: "Contract",
  //   salary: 200000,
  //   work_mode: "On-site",
  //   location: "Delhi",
  //   no_of_positions: 2,
  //   years_of_experience: 2,
  //   employer_id: "6787710ca67c9a439575c41e",
  // };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-8 w-[90%] md:w-[70%] xl:w-[60%] bg-gray-100 p-4">
        <div className="flex justify-between">
          {/* <h1 className="text-3xl font-semibold">
          {job.company_name.slice(0, 1).toUpperCase()}
        </h1> */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold capitalize">
              {job?.company_name}
            </h2>
            <p className="capitalize">{job?.title}</p>
            <p className="capitalize text-gray-400 text-sm">
              {job?.location} - {job?.work_mode}
            </p>
          </div>

          <h1
            className="h-min px-2 py-1 text-white rounded-md"
            style={{ backgroundColor: statusColors[status] }}
          >
            {status || ""}
          </h1>
        </div>

        <div className="flex gap-4 flex-wrap">
          <div
            className="flex flex-col gap-1 rounded-xl px-8 py-2 items-center bg-gray-300"
            style={{ backgroundColor: "#A7F3D0" }}
          >
            <p className="text-xs">Salary</p>
            <p className="text-lg">{job?.salary}/Year</p>
          </div>
          <div
            className="flex flex-col gap-1 rounded-xl px-8 py-2 items-center bg-gray-300"
            style={{ backgroundColor: "#93C5FD" }}
          >
            <p className="text-xs">Job Type</p>
            <p className="text-lg">{job?.employment_type}</p>
          </div>

          <div
            className="flex flex-col gap-1 rounded-xl px-8 py-2 items-center bg-gray-300"
            style={{ backgroundColor: "#FECAC0" }}
          >
            <p className="text-xs">Number Of Positions</p>
            <p className="text-lg"> {job?.no_of_positions}</p>
          </div>

          <div
            className="flex flex-col gap-1 rounded-xl px-8 py-2 items-center bg-gray-300"
            style={{ backgroundColor: "#A5B4FC" }}
          >
            <p className="text-xs">Years Of Experience</p>
            <p className="text-lg">{job?.years_of_experience}</p>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-semibold">Job Description</h1>
          <p className="text-gray-400 text-sm">{job?.description}</p>
        </div>

        <div>
          <button
            className={`bg-black text-white w-full rounded-md py-1 ${
              isAlreadyApplied && "cursor-not-allowed"
            }`}
            onClick={handleApply}
            disabled={isAlreadyApplied}
          >
            {isAlreadyApplied ? "Already Applied" : "Apply Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
