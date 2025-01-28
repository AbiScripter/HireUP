import { useDispatch, useSelector } from "react-redux";
import {
  fetchPaginatedJobs,
  setFilters,
} from "../../redux/reducers/employee/employee";
import { Drawer, Divider } from "@mui/material";
import { useState } from "react";
import { Menu } from "lucide-react";

const JobFiltersDrawer = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.employee.filters);
  const [open, setOpen] = useState(false);
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
    ); // Reset all filters including search_term
    dispatch(fetchPaginatedJobs({ page: 1, filters: filters }));
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div>
      <div className="md:hidden">
        <Menu
          onClick={toggleDrawer(true)}
          className="cursor-pointer absolute top-3 left-3"
          size={30}
        />

        <Drawer open={open} onClose={toggleDrawer(false)}>
          <div className="p-4 flex flex-col gap-4">
            <div className="flex justify-between items-center gap-4">
              <h1 className="text-xl font-bold">Filters</h1>
              <button
                onClick={handleReset}
                className="text-red-500 font-semibold cursor-pointer px-4 py-1 bg-red-100 text-center"
              >
                Reset Search & Filters
              </button>
            </div>

            {/* Filters */}
            {/* Employment Type */}
            <Divider />
            <div>
              <h2 className="text-lg font-semibold">Employment Type</h2>
              <div className="mt-2">
                {["Full-time", "Part-time", "Contract", "Freelance"].map(
                  (type) => (
                    <label key={type} className="block min-w-42">
                      <input
                        type="checkbox"
                        value={type}
                        checked={filters.employment_type?.includes(type)}
                        onChange={() =>
                          handleCheckboxChange("employment_type", type)
                        }
                      />
                      <span className="ml-2">{type}</span>
                    </label>
                  )
                )}
              </div>
            </div>

            <Divider />

            {/* Salary */}
            <div>
              <h2 className="text-lg font-semibold">Salary</h2>
              <div className="mt-2">
                {["below_5", "below_10", "above_10"].map((range) => (
                  <label key={range} className="block min-w-42">
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
              <div className="mt-2">
                {["On-site", "Remote", "Hybrid"].map((mode) => (
                  <label key={mode} className="block min-w-42">
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
        </Drawer>
      </div>
    </div>
  );
};

export default JobFiltersDrawer;
