import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { JobT } from '../types/jobs';

const Home: NextPage = () => {
  const [jobs, setJobs] = useState<JobT[]>([]);
  const loadInitialData = async () => {
    const response = await fetch(
      'https://userapi.alfred.is/api/v1/front-web/jobs?page=1&size=30'
    );
    const jobs = (await response.json()).jobs;
    setJobs(jobs as JobT[]);
  };
  useEffect(() => {
    loadInitialData();
  }, []);
  return (
    <div className="container mx-auto">
      <h1 className={'text-3xl font-bold m-5'}>Jobs List App</h1>
      {jobs.map((job, i) => (
        <div
          className={'border rounded-md border-dashed border-[#b6b6b6] mb-4'}
          key={i}
        >
          <a
            className={'p-4 block hover:bg-[#e9e9e9]'}
            href={'/job/' + job.slug}
          >
            {job.title}
          </a>
        </div>
      ))}
    </div>
  );
};

export default Home;
