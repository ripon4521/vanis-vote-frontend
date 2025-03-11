/* eslint-disable react/prop-types */
import { useState } from "react";
import { ArrowLeft, Flame, ThumbsUp, Clock, MessageSquare, Copy, CheckCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { axiosPublic } from "../../../Hooks/usePublic";
import { toast } from "react-toastify";
import useGetAllPolls from "../../../Hooks/useGetAllPolls";


export default function PrivatePollCard({poll}) {
  // eslint-disable-next-line no-unused-vars
  const [polls, refetch ] = useGetAllPolls();
  

  
  const [selectedOption, setSelectedOption] = useState(null);
  const [comment, setComment] = useState("");
  const [copied, setCopied] = useState(false);

  if (!poll) return <p>লোড হচ্ছে...</p>;

  const expiresIn = new Date(poll.expiresAt).getTime() - Date.now();
  const expiresText = expiresIn > 0 ? `${Math.ceil(expiresIn / 3600000)} ঘন্টা বাকি` : "মেয়াদ শেষ";

  const handleVote = async (_id) => {
    if (!selectedOption) return;
  
    const updatedPoll = {
      hasVoted: true,
      totalVotes: poll.totalVotes + 1,
      options: poll.options.map((opt) =>
        opt.id === selectedOption ? { ...opt, votes: opt.votes + 1 } : opt
      ),
    };

    await axiosPublic.patch(`/polls/${_id}`, updatedPoll).then(response => {
        console.log(response)
        toast.success('Your Vote Submited');
        refetch()
    }).catch(err => {
        console.log(err)
    })
  };


  
  const handleReaction = async (type, _id,popular, like) => {
   
    const popu = {
        popular:popular+ 1
    }
    const lik = {
        like:like+ 1
    }
  

    if (type === 'popular') {
        await axiosPublic.patch(`/polls/${_id}`, popu).then(response => {
            console.log(response)
            refetch();
        }).catch(err => {
            console.log(err)
        })
    }else if (type === 'like') {
        await axiosPublic.patch(`/polls/${_id}`, lik).then(response => {
            console.log(response)
            refetch();
        }).catch(err => {
            console.log(err)
        })
    }

    // API কলের মাধ্যমে রিঅ্যাকশন আপডেট করা লাগবে
  };


  const handleAddComment = async (e, _id, x) => {
    e.preventDefault();  // সাবমিট হওয়ার পূর্বে ডিফল্ট অ্যাকশন বন্ধ করা
    
    if (!comment.trim()) return;  // যদি কমেন্ট খালি থাকে তবে কিছুই করবে না
  
    // নতুন কমেন্ট ডাটা
    const newComment = {
      comment: comment,
      createdAt: new Date().toLocaleString(),  // বর্তমান সময় যোগ করা
    };
  
    // যদি x.comments অ্যারে না থাকে, তবে একটি খালি অ্যারে সেট করা হবে
    const updatedComments = [
      ...(Array.isArray(x.comments) ? x.comments : []),  // নিশ্চিত হওয়া যে x.comments একটি অ্যারে
      newComment,     // নতুন কমেন্ট
    ];
  
    try {
      // API কলের মাধ্যমে কমেন্ট আপডেট করা
      const response = await axiosPublic.patch(`/polls/${_id}`, {
        ...x,                // poll-এর পূর্বের ডাটা
        comments: updatedComments,  // আপডেট করা কমেন্টস অ্যারে
      });
      console.log(response);
      refetch();  // poll ডাটা রিফেচ করার জন্য
    } catch (err) {
      console.error(err);
    }
  
    setComment("");  // কমেন্ট ইনপুট ফিল্ড ক্লিয়ার করা
  };
  


  const copyPollLink = (_id) => {
    const data = `http://localhost:5173/polls/${_id}`;  
    navigator.clipboard.writeText(data);  
    setCopied(true);  
    setTimeout(() => setCopied(false), 2000); 
  };
  

  return (
    <div className="max-w-2xl mx-auto p-6">
      <button className="text-gray-500 hover:text-black">
        <Link className="flex items-center gap-2" to='/'>
          <ArrowLeft className="w-4 h-4" /> হোমে ফিরে যান
        </Link>
      </button>

      <div className="bg-white shadow-md rounded-lg p-6 mt-4">
        <h2 className="text-2xl font-bold">{poll.question}</h2>
        <p className="text-gray-500 flex items-center gap-2 mt-2">
          <Clock className="w-4 h-4" /> {expiresText}
        </p>
        <Link  className="mt-2 text-sm flex items-center gap-1 text-blue-500" onClick={()=>copyPollLink(poll?._id)}>
          {copied ? <CheckCheck className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? "কপি হয়েছে" : "লিংক কপি করুন"}
        </Link>

        {!poll.hasVoted ? (
    <div className="mt-4 space-y-2">
      {poll.options.map((opt) => (
        <label key={opt.id} className="flex items-center gap-2 border p-2 rounded-md cursor-pointer hover:bg-gray-100">
          <input type="radio" name="poll" value={opt.id} onChange={() => setSelectedOption(opt.id)} />
          {opt.text}
        </label>
      ))}
      <button
        className="w-full bg-blue-600 text-white p-2 rounded-md mt-2 disabled:bg-gray-400"
        disabled={!selectedOption}
        onClick={() => handleVote(poll?._id)}
      >
        ভোট দিন
      </button>
    </div>
  ) : (
    !poll.hideResults ? (
        <div className="mt-4">
          {poll.options.map((opt) => (
            <div key={opt.id} className="mb-2">
              <div className="flex justify-between text-sm">
                <span>{opt.text}</span>
                <span>{poll.totalVotes > 0 ? ((opt.votes / poll.totalVotes) * 100).toFixed(1) : 0}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${poll.totalVotes > 0 ? (opt.votes / poll.totalVotes) * 100 : 0}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-gray-500">ভোটের ফলাফল গোপন রাখা হয়েছে।</p>
      )
  )}

        



      

        <div className="mt-4 flex gap-2">
          <button className="flex items-center gap-1 border p-2 rounded-md" onClick={() => handleReaction("popular", poll?._id, poll?.popular, poll?.like)}>
            <Flame className="w-4 h-4 text-orange-500" /> {poll.popular}
          </button>
          <button className="flex items-center gap-1 border p-2 rounded-md" onClick={() => handleReaction("like",poll?._id, poll?.popular, poll?.like)}>
            <ThumbsUp className="w-4 h-4 text-blue-500" /> {poll.like}
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mt-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <MessageSquare className="w-4 h-4" /> মন্তব্য ({poll.comments.length})
        </h3>
        <form className="mt-2 flex gap-2"onSubmit={(e) => handleAddComment(e, poll?._id, poll?.comments || [])}
        >
          <input
            type="text"
            placeholder="একটি মন্তব্য যোগ করুন..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-grow border p-2 rounded-md"
          />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded-md">পোস্ট</button>
        </form>
        <div className="mt-4 space-y-3 max-h-40 overflow-y-auto">
          {poll.comments.length === 0 ? (
            <p className="text-sm text-gray-500">এখনও কোন মন্তব্য নেই।</p>
          ) : (
            poll.comments.map((c) => (
              <div key={c.id} className="border p-2 rounded-md">
                <p>{c?.comment}</p>
                <p className="text-xs text-gray-500 mt-1">{new Date(c.createdAt).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}



