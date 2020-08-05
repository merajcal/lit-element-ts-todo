import {LitElement, html, customElement, property, css} from 'lit-element';

@customElement('todo-item')
export class TodoItem extends LitElement {
  @property({type: String}) item = '';
  @property() deleteItem: any;

  static styles = css`
  .todo-item {
      display: flex;
      width: 100%;
  }
  .todo-item-text {
      flex: 1;
  }

  .close {
      position: absolute;
      right: 0;
      top: 0;
      padding: 12px 16px 12px 16px;
    }

    .close:hover {
      background-color: #f44336;
      color: white;
    }
  `;
  render() {
    return html`
      <div class="todo-item">
        <span class="todo-item-text">${this.item}</span>  
        <span class="close" @click=${this.deleteItem}>X</span>
      </div>
    `;
  }
}
