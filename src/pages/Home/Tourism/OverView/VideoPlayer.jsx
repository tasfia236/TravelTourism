
import video from '../../../../assets/Video.mp4';

const VideoPlayer = () => {

    return (
        <div>
            <div className='flex justify-center items-center'>
                <video controls  width="640" height="360">
                    <source  src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
};

export default VideoPlayer;