import React from "react";
import JobContext from './jobsContext'

const JobState = (props) => {

    const state= {
        "name": "harry",
        "class": "10"
    }

    return (
        <JobContext.provider value= {state}>
            {props.children}
        </JobContext.provider>
    )
}

export default JobState