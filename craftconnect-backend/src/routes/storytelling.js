const express = require('express');
const aiStoryteller = require('../controllers/aiStoryteller');
const BrandStory = require('../models/BrandStory');
const SocialMediaContent = require('../models/SocialMediaContent');

const router = express.Router();

// Generate brand story
router.post('/generate-brand-story', aiStoryteller.generateBrandStory.bind(aiStoryteller));

// Generate social media content
router.post('/generate-social-content', aiStoryteller.generateSocialMediaContent.bind(aiStoryteller));

// Save brand story
router.post('/save-brand-story', async (req, res) => {
  try {
    const storyData = { ...req.body, artisanId: req.body.artisanId || 'demo-artisan' };
    const brandStory = new BrandStory(storyData);
    await brandStory.save();
    
    res.json({
      success: true,
      storyId: brandStory._id,
      message: 'Brand story saved successfully'
    });
  } catch (error) {
    console.error('Error saving brand story:', error);
    res.status(500).json({ error: 'Failed to save brand story' });
  }
});

// Save social media content
router.post('/save-social-content', async (req, res) => {
  try {
    const contentData = { ...req.body, artisanId: req.body.artisanId || 'demo-artisan' };
    const socialContent = new SocialMediaContent(contentData);
    await socialContent.save();
    
    res.json({
      success: true,
      contentId: socialContent._id,
      message: 'Social media content saved successfully'
    });
  } catch (error) {
    console.error('Error saving social media content:', error);
    res.status(500).json({ error: 'Failed to save social media content' });
  }
});

// Get brand stories for an artisan
router.get('/brand-stories/:artisanId', async (req, res) => {
  try {
    const stories = await BrandStory.find({ 
      artisanId: req.params.artisanId,
      isActive: true 
    }).sort({ createdAt: -1 });
    
    res.json({ success: true, stories });
  } catch (error) {
    console.error('Error fetching brand stories:', error);
    res.status(500).json({ error: 'Failed to fetch brand stories' });
  }
});

// Get social media content for an artisan
router.get('/social-content/:artisanId', async (req, res) => {
  try {
    const { platform, status } = req.query;
    const filter = { 
      artisanId: req.params.artisanId,
      isActive: true 
    };
    
    if (platform) filter.platform = platform;
    if (status) filter.status = status;
    
    const content = await SocialMediaContent.find(filter).sort({ createdAt: -1 });
    
    res.json({ success: true, content });
  } catch (error) {
    console.error('Error fetching social media content:', error);
    res.status(500).json({ error: 'Failed to fetch social media content' });
  }
});

// Update social media content status
router.patch('/social-content/:contentId/status', async (req, res) => {
  try {
    const { status, publishedDate } = req.body;
    const updateData = { status };
    
    if (status === 'published' && publishedDate) {
      updateData.publishedDate = publishedDate;
    }
    
    const content = await SocialMediaContent.findByIdAndUpdate(
      req.params.contentId,
      updateData,
      { new: true }
    );
    
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }
    
    res.json({ success: true, content });
  } catch (error) {
    console.error('Error updating content status:', error);
    res.status(500).json({ error: 'Failed to update content status' });
  }
});

module.exports = router;
