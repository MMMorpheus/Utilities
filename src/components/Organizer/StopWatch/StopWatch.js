import React, {useState, useEffect} from 'react';
import TimePanel from '../DesignElements/TimePanel/TimePanel';
import ControlPanel from '../DesignElements/ControlPanel/ControlPanel';
import Dashboard from '../DesignElements/StopwatchDashboard/Dashboard';

import './StopWatch.scss'
import {addMilliseconds} from 'date-fns'

const StopWatch = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(new Date(0, 0, 0, 0));
    const [results, setResults] = useState([]);


    const toggle = () => {
        setIsRunning(!isRunning)
    }
     
    const tick = () => {
        setTime(addMilliseconds (time, 10));
    }

    const reset = () => {
        if(isRunning) {
            toggle()
        }
        setTime(new Date(0, 0, 0, 0))
    }

    const lap = () => {
        results.push(time)
        setResults(results)
    }

    let id = null;
    useEffect(() => {
        if(isRunning){
            id = setTimeout(tick, 10);
        };
        return () => {
            clearTimeout(id)
        }
    }, [isRunning, time])


    return (
        <section>
            <article className='stopWatch'>
                <TimePanel time={time}/>
                <ControlPanel onGo={toggle} isRunning={isRunning} onReset={reset} onLap={lap}/>
            </article>
            {results.length === 0 ? null : <Dashboard results={results}/>}
            
        </section>
    );
}

export default StopWatch;