
const Plan = ({tour_plan}) => {
    return (
        <div className="tour-plan">
                {tour_plan.map((day, index) => (
                    <div key={index} className="tour-day">
                        <h3>Day {day.day}: {day.title}</h3>
                        <p>{day.description}</p>
                    </div>
                ))}
            </div>
    );
};

export default Plan;