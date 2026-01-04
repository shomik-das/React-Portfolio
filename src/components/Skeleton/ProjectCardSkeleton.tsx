
const ProjectCardSkeleton = () => {
    return (
        <div className='bg-neutral-800 p-3 flex flex-col justify-between gap-5 rounded-md animate-pulse'>
            <div className='w-full h-52 bg-[#2e2e2e] rounded-md'>

            </div>
            <div>
                <div className='w-44 bg-[#2e2e2e] h-5 mb-3 rounded-md'></div>
                <div className='w-54 bg-[#2e2e2e] h-4 rounded-md'></div>

                <div className='flex items-center gap-3 mt-3'>
                    <div className='w-16 h-8 bg-[#2e2e2e] rounded-md'></div>
                    <div className='w-16 h-8 bg-[#2e2e2e] rounded-md'></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default ProjectCardSkeleton