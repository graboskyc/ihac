// web component
class SkeletonCard extends HTMLElement {
  
    // connect component
    connectedCallback() {
      this.innerHTML = `
        <article class="productCard" data-theme="dark">
            <header>
                <div class="skeleton skeleton-text" style="height:20px;width:55%;"></div>
            </header>
            <div class="skeleton skeleton-text" style="height: 280px; width: 100%;"></div>
            <footer>
                <div class="skeleton skeleton-text" style="width:45%;"></div>
            </footer>
        </article>`;
    }
    
  }
  
  // register component
  customElements.define('skeleton-card', SkeletonCard );