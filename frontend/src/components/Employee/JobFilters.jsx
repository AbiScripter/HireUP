import { useDispatch, useSelector } from "react-redux";
import {
  fetchPaginatedJobs,
  setFilters,
} from "../../redux/reducers/employee/employee";
import { Divider } from "@mui/material";

const JobFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.employee.filters);
  // Handle checkbox changes
  const handleCheckboxChange = (filterCategory, value) => {
    const updatedFilters = { ...filters };
    const currentValues = updatedFilters[filterCategory] || [];
    if (currentValues.includes(value)) {
      updatedFilters[filterCategory] = currentValues.filter(
        (item) => item !== value
      );
    } else {
      updatedFilters[filterCategory] = [...currentValues, value];
    }
    dispatch(setFilters(updatedFilters));
    //have to reset the page to 1 , if the filter changes
    dispatch(fetchPaginatedJobs({ page: 1, filters: updatedFilters }));
  };

  const handleReset = () => {
    dispatch(
      setFilters({
        employment_type: [],
        salary: [],
        work_mode: [],
        search_term: "",
      })
    );
    // Reset all filters including search_term
    dispatch(fetchPaginatedJobs({ page: 1, filters: filters }));
  };

  return (
    <div className="flex flex-col gap-6 w-full p-4">
      <div className="flex justify-between items-center flex-col gap-2">
        <h1 className="text-xl font-bold">Filters</h1>
        <button
          onClick={handleReset}
          className="text-red-500 font-semibold cursor-pointer px-4 py-1 bg-red-100 text-center"
        >
          Reset Search & Filters
        </button>
      </div>

      <Divider />

      {/* Filters */}
      {/* Employment Type */}
      <div>
        <h2 className="text-lg font-semibold">Employment Type</h2>
        <div className="grid xl:grid-cols-2 mt-2">
          {["Full-time", "Part-time", "Contract", "Freelance"].map((type) => (
            <label key={type} className="block">
              <input
                type="checkbox"
                value={type}
                checked={filters.employment_type?.includes(type)}
                onChange={() => handleCheckboxChange("employment_type", type)}
              />
              <span className="ml-2">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <Divider />

      {/* Salary */}
      <div>
        <h2 className="text-lg font-semibold">Salary</h2>
        <div className="grid xl:grid-cols-2 mt-2">
          {["below_5", "below_10", "above_10"].map((range) => (
            <label key={range} className="block">
              <input
                type="checkbox"
                value={range}
                checked={filters.salary?.includes(range)}
                onChange={() => handleCheckboxChange("salary", range)}
              />
              <span className="ml-2">
                {range === "below_5"
                  ? "Below 5 Lakh"
                  : range === "below_10"
                  ? "Below 10 Lakh"
                  : "Above 10 Lakh"}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Divider />
      {/* Work Mode */}
      <div>
        <h2 className="text-lg font-semibold">Work Mode</h2>
        <div className="grid xl:grid-cols-2 mt-2">
          {["On-site", "Remote", "Hybrid"].map((mode) => (
            <label key={mode} className="block">
              <input
                type="checkbox"
                value={mode}
                checked={filters.work_mode?.includes(mode)}
                onChange={() => handleCheckboxChange("work_mode", mode)}
              />
              <span className="ml-2">{mode}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobFilters;
