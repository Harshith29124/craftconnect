import React, { useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";

const StorytellingStudio = () => {
  const [formData, setFormData] = useState({
    businessType: "",
    region: "",
    traditionalTechnique: "",
    targetAudience: "general",
  });
  const [story, setStory] = useState(null);
  const [socialContent, setSocialContent] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("brand-story");
  const [error, setError] = useState("");

  const businessTypes = [
    "Pottery",
    "Jewelry",
    "Textiles",
    "Woodcraft",
    "Metalwork",
    "Embroidery",
    "Painting",
    "Leatherwork",
    "Stonework",
    "Other",
  ];

  const regions = [
    "Rajasthan",
    "Gujarat",
    "Kashmir",
    "Karnataka",
    "Tamil Nadu",
    "West Bengal",
    "Uttar Pradesh",
    "Maharashtra",
    "Punjab",
    "Kerala",
    "Assam",
    "Orissa",
    "Madhya Pradesh",
    "Other",
  ];

  const platforms = ["instagram", "facebook", "youtube", "twitter", "whatsapp"];

  const generateBrandStory = async () => {
    if (
      !formData.businessType ||
      !formData.region ||
      !formData.traditionalTechnique
    ) {
      setError("Please fill in all required fields");
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      const response = await axios.post(
        API_ENDPOINTS.STORYTELLING.GENERATE_BRAND_STORY,
        formData
      );
      if (response.data.success) {
        setStory(response.data.story);
      } else {
        setError("Failed to generate brand story");
      }
    } catch (error) {
      console.error("Error generating brand story:", error);
      setError("Failed to generate brand story. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const generateSocialContent = async (platform, contentType) => {
    if (
      !formData.businessType ||
      !formData.region ||
      !formData.traditionalTechnique
    ) {
      setError("Please fill in all required fields first");
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      const response = await axios.post(
        API_ENDPOINTS.STORYTELLING.GENERATE_SOCIAL_CONTENT,
        {
          ...formData,
          platform,
          contentType,
        }
      );
      if (response.data.success) {
        setSocialContent(response.data.content);
      } else {
        setError("Failed to generate social media content");
      }
    } catch (error) {
      console.error("Error generating social content:", error);
      setError("Failed to generate social media content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-text-primary mb-4">
            Storytelling Studio
          </h1>
          <p className="text-lg text-text-secondary">
            Create compelling brand stories and social media content for your
            craft business
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-lg p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-text-primary">
            Tell Us About Your Craft
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-text-primary">
                Business Type *
              </label>
              <select
                value={formData.businessType}
                onChange={(e) =>
                  setFormData({ ...formData, businessType: e.target.value })
                }
                className="w-full px-4 py-3 border border-border-color rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              >
                <option value="">Select your craft type</option>
                {businessTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-text-primary">
                Region *
              </label>
              <select
                value={formData.region}
                onChange={(e) =>
                  setFormData({ ...formData, region: e.target.value })
                }
                className="w-full px-4 py-3 border border-border-color rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              >
                <option value="">Select your region</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2 text-text-primary">
                Traditional Technique *
              </label>
              <input
                type="text"
                placeholder="e.g., Blue Pottery, Kalamkari, Meenakari, Chikankari..."
                value={formData.traditionalTechnique}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    traditionalTechnique: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border border-border-color rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2 text-text-primary">
                Target Audience
              </label>
              <select
                value={formData.targetAudience}
                onChange={(e) =>
                  setFormData({ ...formData, targetAudience: e.target.value })
                }
                className="w-full px-4 py-3 border border-border-color rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              >
                <option value="general">General Audience</option>
                <option value="local">Local Community</option>
                <option value="tourists">Tourists & Travelers</option>
                <option value="collectors">Art Collectors</option>
                <option value="export">Export Market</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
              <button
                onClick={() => setError("")}
                className="mt-2 text-sm text-red-500 hover:text-red-700 underline"
              >
                Dismiss
              </button>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-border-color mb-8">
          <button
            onClick={() => setActiveTab("brand-story")}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === "brand-story"
                ? "border-primary text-primary"
                : "border-transparent text-text-secondary hover:text-primary"
            }`}
          >
            Brand Story
          </button>
          <button
            onClick={() => setActiveTab("social-content")}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === "social-content"
                ? "border-primary text-primary"
                : "border-transparent text-text-secondary hover:text-primary"
            }`}
          >
            Social Media Content
          </button>
        </div>

        {/* Brand Story Tab */}
        {activeTab === "brand-story" && (
          <div className="space-y-6">
            <div className="text-center">
              <button
                onClick={generateBrandStory}
                disabled={isGenerating}
                className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-hover transition-colors disabled:opacity-50"
              >
                {isGenerating
                  ? "Generating Your Story..."
                  : "Generate Brand Story"}
              </button>
            </div>

            {story && (
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <h3 className="text-2xl font-bold mb-6 text-text-primary">
                  {story.storyTitle}
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-text-primary">
                      Origin Story
                    </h4>
                    <p className="text-text-secondary leading-relaxed">
                      {story.originStory}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-text-primary">
                      Craft Journey
                    </h4>
                    <p className="text-text-secondary leading-relaxed">
                      {story.craftJourney}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-text-primary">
                      Cultural Significance
                    </h4>
                    <p className="text-text-secondary leading-relaxed">
                      {story.culturalSignificance}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-text-primary">
                      Unique Value
                    </h4>
                    <p className="text-text-secondary leading-relaxed">
                      {story.uniqueValue}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-text-primary">
                      Modern Relevance
                    </h4>
                    <p className="text-text-secondary leading-relaxed">
                      {story.modernRelevance}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-text-primary">
                      Emotional Connection
                    </h4>
                    <p className="text-text-secondary leading-relaxed">
                      {story.emotionalConnection}
                    </p>
                  </div>

                  <div className="bg-secondary p-6 rounded-lg">
                    <h4 className="text-xl font-bold mb-2 text-primary">
                      Brand Tagline
                    </h4>
                    <p className="text-text-primary text-lg font-medium">
                      {story.brandTagline}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-text-primary">
                      Key Messages
                    </h4>
                    <ul className="space-y-2">
                      {story.keyMessages.map((message, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-text-secondary">{message}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-text-primary">
                      Storytelling Tips
                    </h4>
                    <ul className="space-y-2">
                      {story.storytellingTips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1">💡</span>
                          <span className="text-text-secondary">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Social Media Content Tab */}
        {activeTab === "social-content" && (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-text-secondary mb-6">
                Generate content for different platforms and formats
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                {platforms.map((platform) => (
                  <button
                    key={platform}
                    onClick={() => generateSocialContent(platform, "post")}
                    disabled={isGenerating}
                    className="p-4 bg-white border border-border-color rounded-lg hover:border-primary hover:shadow-md transition-all disabled:opacity-50"
                  >
                    <div className="text-2xl mb-2">
                      {platform === "instagram" && "📷"}
                      {platform === "facebook" && "📘"}
                      {platform === "youtube" && "📺"}
                      {platform === "twitter" && "🐦"}
                      {platform === "whatsapp" && "💬"}
                    </div>
                    <span className="text-sm font-semibold capitalize">
                      {platform}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {socialContent && (
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <h3 className="text-2xl font-bold mb-6 text-text-primary">
                  {socialContent.platform?.charAt(0).toUpperCase() +
                    socialContent.platform?.slice(1)}{" "}
                  Content
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-text-primary">
                      Caption
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-text-primary whitespace-pre-line">
                        {socialContent.caption}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-text-primary">
                      Hashtags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {socialContent.hashtags?.map((hashtag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-secondary text-primary text-sm rounded-full"
                        >
                          #{hashtag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-text-primary">
                      Visual Suggestions
                    </h4>
                    <ul className="space-y-2">
                      {socialContent.visualSuggestions?.map(
                        (suggestion, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary mt-1">📸</span>
                            <span className="text-text-secondary">
                              {suggestion}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-text-primary">
                      Call to Action
                    </h4>
                    <p className="text-text-secondary">
                      {socialContent.callToAction}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-text-primary">
                      Engagement Tactics
                    </h4>
                    <ul className="space-y-2">
                      {socialContent.engagementTactics?.map((tactic, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1">🎯</span>
                          <span className="text-text-secondary">{tactic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {socialContent.platformSpecificTips && (
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-text-primary">
                        Platform-Specific Tips
                      </h4>
                      <p className="text-text-secondary">
                        {socialContent.platformSpecificTips}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default StorytellingStudio;
