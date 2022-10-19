import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { JobT } from '../../types/jobs';

const Job: NextPage = () => {
  const {
    query: { id },
  } = useRouter();
  const [job, setJob] = useState<JobT | null>(null);

  const loadInitialData = async () => {
    if (id) {
      const data = await fetch(
        `https://userapi.alfred.is/api/v1/front-web/jobs?slug=${id}`
      );
      const job = (await data.json()).job;
      setJob(job);
    }
  };
  useEffect(() => {
    loadInitialData();
  }, [id]);

  if (!job) {
    return null;
  }

  return (
    <div className="container mx-auto">
      <div className="max-w-[640px] mx-auto">
        <h1 className={'text-3xl font-bold m-5'}>{job.title}</h1>
        <div>
          <img src={job.brand.cover} className="max-h-[340px]" />
        </div>
        <div className={'p-4'}>
          <div dangerouslySetInnerHTML={{ __html: job.bodyhtml }} />
          <button
            className={
              'border border-white bg-black text-white py-2 px-4 mt-8 hover:bg-white hover:text-black hover:border-black'
            }
            onClick={() => history.back()}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};
export default Job;
