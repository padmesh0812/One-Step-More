import React, { useState } from 'react';
import { X, Clock, User, Heart, CheckCircle2, ChevronRight, Apple } from 'lucide-react';
import { 
  BLOG_HEADER_CONTENT, 
  BLOG_CATEGORIES, 
  BLOG_POSTS, 
  BLOG_RECIPE_CONTENT 
} from '../../constants';
import './Blog.css';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeRecipeTab, setActiveRecipeTab] = useState("ingredients");

  const filteredPosts = activeCategory === "All" 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(post => post.category === activeCategory);

  const renderPostContent = (post) => {
    if (post.id === 1) {
      const sec1 = post.sections[0];
      const sec2 = post.sections[1];
      return (
        <div className="blog-content-body">
          <p>{sec2.intro}</p>
          <h4>{sec1.heading}</h4>
          <p>{sec1.text}</p>
          <h4>{sec2.heading}</h4>
          <ol>
            {sec2.exercises.map((ex, idx) => (
              <li key={idx}>
                <strong>{ex.title}:</strong>
                <p>{ex.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      );
    } else if (post.id === 2) {
      const sec1 = post.sections[0];
      const sec2 = post.sections[1];
      const sec3 = post.sections[2];
      return (
        <div className="blog-content-body">
          <p>{sec1.intro}</p>
          <h4>{sec1.heading}</h4>
          <p>{sec1.text}</p>
          <h4>{sec2.heading}</h4>
          <ul>
            {sec2.nutrients.map((nut, idx) => (
              <li key={idx}>
                <strong>{nut.name}:</strong> {nut.desc}
                <br /><em>Sources:</em> {nut.sources}
              </li>
            ))}
          </ul>
          <h4>{sec3.heading}</h4>
          <p>{sec3.text}</p>
        </div>
      );
    } else if (post.id === 3) {
      const sec1 = post.sections[0];
      return (
        <div className="blog-content-body">
          <p>{sec1.intro}</p>
          <h4>{sec1.heading}</h4>
          <ol>
            {sec1.exercises.map((ex, idx) => (
              <li key={idx}>
                <strong>{ex.title}:</strong>
                <p>{ex.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      );
    }
    return null;
  };

  return (
    <main className="blog-main">
      {/* Blog Hero Section */}
      <section className="section container">
        <div className="section-header">
          <h1>{BLOG_HEADER_CONTENT.titlePrefix}<span>{BLOG_HEADER_CONTENT.titleHighlight}</span></h1>
          <p>{BLOG_HEADER_CONTENT.description}</p>
        </div>

        {/* Filters */}
        <div className="blog-filters">
          {BLOG_CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="blog-grid">
          {filteredPosts.map((post) => (
            <div key={post.id} className="blog-card" onClick={() => setSelectedPost(post)}>
              <img src={post.image} alt={post.title} className="blog-card-img" />
              <div className="blog-card-content">
                <div className="blog-card-meta">
                  <span className="blog-card-tag">{post.category}</span>
                  <span>{post.date}</span>
                </div>
                <h3>{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <span className="blog-read-more">
                  Read Article <ChevronRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Article Detail Modal */}
      {selectedPost && (
        <div className="modal-overlay" onClick={() => setSelectedPost(null)}>
          <div className="modal-content" style={{ maxWidth: '750px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedPost(null)} aria-label="Close modal">
              <X size={20} />
            </button>
            <div className="modal-body" style={{ padding: '40px' }}>
              <div className="blog-modal-header">
                <span className="modal-tag">{selectedPost.category}</span>
                <h2 className="modal-title" style={{ fontSize: '2rem', marginTop: '8px' }}>{selectedPost.title}</h2>
                <div className="blog-modal-meta">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <User size={14} /> By {selectedPost.author}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} /> {selectedPost.readTime}
                  </span>
                </div>
              </div>
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title} 
                style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', marginBottom: '24px' }} 
              />
              {renderPostContent(selectedPost)}
            </div>
          </div>
        </div>
      )}

      {/* Interactive Recipe Widget */}
      <section className="section recipe-widget-section">
        <div className="container">
          <div className="section-header">
            <h2>{BLOG_RECIPE_CONTENT.sectionTitle}</h2>
            <p>{BLOG_RECIPE_CONTENT.sectionDesc}</p>
          </div>

          <div className="recipe-container">
            <div className="recipe-image-box">
              <img src={BLOG_RECIPE_CONTENT.image} alt={BLOG_RECIPE_CONTENT.title} className="recipe-img" />
              <span className="recipe-badge">{BLOG_RECIPE_CONTENT.badge}</span>
            </div>
            
            <div className="recipe-details">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '8px' }}>
                <Apple size={16} /> {BLOG_RECIPE_CONTENT.badgeSubtitle}
              </div>
              <h3>{BLOG_RECIPE_CONTENT.title}</h3>
              <p className="recipe-desc">{BLOG_RECIPE_CONTENT.desc}</p>

              <div className="recipe-meta-badges">
                <span className="recipe-meta-tag"><Clock size={14} /> Prep: {BLOG_RECIPE_CONTENT.prep}</span>
                <span className="recipe-meta-tag"><Clock size={14} /> Cook: {BLOG_RECIPE_CONTENT.cook}</span>
                <span className="recipe-meta-tag"><CheckCircle2 size={14} /> {BLOG_RECIPE_CONTENT.servings}</span>
              </div>

              {/* Recipe Tabs */}
              <div className="recipe-tabs">
                {BLOG_RECIPE_CONTENT.tabs.map(tab => (
                  <button
                    key={tab.key}
                    className={`recipe-tab-btn ${activeRecipeTab === tab.key ? 'active' : ''}`}
                    onClick={() => setActiveRecipeTab(tab.key)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="recipe-tab-content">
                {activeRecipeTab === 'ingredients' && (
                  <ul className="recipe-list">
                    {BLOG_RECIPE_CONTENT.ingredients.map((ing, idx) => (
                      <li key={idx} className="recipe-list-item">
                        <Heart size={14} fill="var(--primary)" color="var(--primary)" />
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeRecipeTab === 'instructions' && (
                  <ol className="recipe-list">
                    {BLOG_RECIPE_CONTENT.instructions.map((step, idx) => (
                      <li key={idx} className="recipe-list-item">
                        <span className="num">{idx + 1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                )}

                {activeRecipeTab === 'nutrition' && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                    {BLOG_RECIPE_CONTENT.nutrition.map((nut, idx) => (
                      <div key={idx} style={{ padding: '12px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', textAlign: 'center', backgroundColor: 'var(--background)' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{nut.label}</div>
                        <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--heading)' }}>{nut.val}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Blog;
