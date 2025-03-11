import  { useState } from "react";
import { toast } from "react-toastify";
import { axiosPublic } from "../../../Hooks/usePublic";
import { useNavigate } from "react-router-dom";

const CreatePollForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    question: "",
    options: "",
    expiresIn: "24h", // Default expiry time
    hideResults: false,
    isPrivate: false,
  });
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name, checked) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleRadioChange = (value) => {
    setFormData((prev) => ({ ...prev, expiresIn: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const options = formData.options.split("\n").filter((option) => option.trim() !== "");

      if (!formData.question || options.length < 2) {
        console.error("You need to provide a question and at least two options.");
        setIsSubmitting(false);
        return;
      }
      const input = {
        question: formData.question,
        options: options.map((opt, index) => ({
          id: `opt${index + 1}`,
          text: opt,
          votes: 0,
        })),
        totalVotes: 0,
        expiresIn: formData.expiresIn,
        hideResults: formData.hideResults,
        isPrivate: formData.isPrivate,
        popular: 0,
        like: 0,
        hasVoted:false,
        comments: [],
      };

      axiosPublic.post('/polls/create-polls', input).then(response => {
        console.log(response)
        toast.success("Poll created successfully!");
        navigate('/polls/fakePoll')
      }).catch(err => {
        console.log(err)
      })

      
     
    


    } catch (error) {
      console.error("Failed to create poll. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-center mb-4">Create a New Poll</h1>
      <p className="text-center text-gray-600 mb-4">Create a poll that will expire after a set period. No login required.</p>
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="question" className="block text-sm font-medium text-gray-700">Question</label>
            <input
              id="question"
              name="question"
              type="text"
              placeholder="What's your favorite programming language?"
              required
              value={formData.question}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="options" className="block text-sm font-medium text-gray-700">Options (one per line)</label>
            <textarea
              id="options"
              name="options"
              placeholder="JavaScript\nPython\nRust\nGo"
              rows={5}
              required
              value={formData.options}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            <p className="text-sm text-gray-500">Provide at least two options, one per line.</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Poll Duration</label>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="1h"
                  name="expiresIn"
                  value="1h"
                  checked={formData.expiresIn === "1h"}
                  onChange={(e) => handleRadioChange(e.target.value)}
                  className="text-blue-500"
                />
                <label htmlFor="1h" className="text-sm text-gray-700">1 Hour</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="12h"
                  name="expiresIn"
                  value="12h"
                  checked={formData.expiresIn === "12h"}
                  onChange={(e) => handleRadioChange(e.target.value)}
                  className="text-blue-500"
                />
                <label htmlFor="12h" className="text-sm text-gray-700">12 Hours</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="24h"
                  name="expiresIn"
                  value="24h"
                  checked={formData.expiresIn === "24h"}
                  onChange={(e) => handleRadioChange(e.target.value)}
                  className="text-blue-500"
                />
                <label htmlFor="24h" className="text-sm text-gray-700">24 Hours</label>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="hideResults"
              checked={formData.hideResults}
              onChange={(e) => handleSwitchChange("hideResults", e.target.checked)}
              className="text-blue-500"
            />
            <label htmlFor="hideResults" className="text-sm text-gray-700">Hide Results Until Poll Ends</label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isPrivate"
              checked={formData.isPrivate}
              onChange={(e) => handleSwitchChange("isPrivate", e.target.checked)}
              className="text-blue-500"
            />
            <label htmlFor="isPrivate" className="text-sm text-gray-700">Private Poll (Accessible Only via Link)</label>
          </div>
        </div>

        <div className="mt-4">
          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Poll"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePollForm;
