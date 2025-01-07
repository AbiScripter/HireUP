import jobData from "../jobData";
import JobCard from "../components/JobCard";

const JobsPage = () => {
  return (
    <div>
      <div>{/* <JobFilters /> */}</div>
      <div className="flex gap-4 flex-wrap bg-red-50">
        {jobData.map((job, i) => (
          <JobCard job={job} key={i} />
        ))}
      </div>
    </div>
  );
};

// const JobFilters = () => {
//   return (
//     <div className="w-56">
//       <Accordion>
//         <AccordionSummary
//           expandIcon={<ChevronUp />}
//           aria-controls="panel1-content"
//           id="panel1-header"
//         >
//           <p component="span" className="text-lg font-semibold">
//             Location
//           </p>
//         </AccordionSummary>
//         <AccordionDetails>
//           <FormGroup>
//             <FormControlLabel control={<Checkbox />} label="Label" />
//           </FormGroup>
//         </AccordionDetails>
//       </Accordion>
//     </div>
//   );
// };
export default JobsPage;
