import {LitElement, customElement, property, html, css} from 'lit-element';

import './todo-item';

@customElement('todo-app')
export class Todo extends LitElement {
  @property({type: String}) todo: string;
  @property({type: Array}) list: string[] = [];

  constructor() {
    super();
    this.list = [this.todoItem('clean the house'), this.todoItem('buy milk')];
    this.todo = '';
  }

  todoItem(todo: string) {
    return todo;
  }

  createNewToDoItem() {
    if (this.todo === '') {
      return;
    }
    this.list = [...this.list, this.todoItem(this.todo)];
    this.todo = '';
  }

  handleKeyPress(e) {
    if (e.target.value !== '') {
      if (e.key === 'Enter') {
        this.createNewToDoItem();
      }
    }
  }

  handleInput(e: any) {
    this.todo = e.target.value;
  }

  // this is now being emitted back to the parent from the child component
  deleteItem(indexToDelete: number) {
    this.list = this.list.filter((_toDo, index) => index !== indexToDelete);
  }

  static styles = css`
    /* Include the padding and border in an element's total width and height */
    * {
      box-sizing: border-box;
    }

    /* Remove margins and padding from the list */
    ul {
      margin: 0;
      padding: 0;
    }

    /* Style the list items */
    ul li {
      cursor: pointer;
      position: relative;
      padding: 12px 8px 12px 40px;
      background: #eee;
      font-size: 18px;
      transition: 0.2s;
      user-select: none;
    }

    /* Set all odd list items to a different color (zebra-stripes) */
    ul li:nth-child(odd) {
      background: #f9f9f9;
    }

    /* Darker background-color on hover */
    ul li:hover {
      background: #ddd;
    }

    /* When clicked on, add a background color and strike out text */
    ul li.checked {
      background: #888;
      color: #fff;
      text-decoration: line-through;
    }

    /* Add a "checked" mark when clicked on */
    ul li.checked::before {
      content: '';
      position: absolute;
      border-color: #fff;
      border-style: solid;
      border-width: 0 2px 2px 0;
      top: 10px;
      left: 16px;
      transform: rotate(45deg);
      height: 15px;
      width: 7px;
    }

    /* Style the header */
    .header {
      background-color: #21c1f3;
      padding: 30px 40px;
      color: white;
      text-align: center;
    }

    /* Clear floats after the header */
    .header:after {
      content: '';
      display: table;
      clear: both;
    }

    /* Style the input */
    input {
      margin: 0;
      border: none;
      border-radius: 0;
      width: 75%;
      padding: 10px;
      float: left;
      font-size: 16px;
    }

    /* Style the "Add" button */
    .addBtn {
      padding: 10px;
      width: 25%;
      background: #d9d9d9;
      color: #555;
      float: left;
      text-align: center;
      font-size: 16px;
      cursor: pointer;
      transition: 0.3s;
      border-radius: 0;
      border: 0;
    }

    .addBtn:hover {
      background-color: #bbb;
    }
  `;

  render() {
    return html`
      <div class="todo">
        <div id="myDIV" class="header">
          <form>
            <h1>LitElement - TODO</h1>
            <input
              required
              type="text"
              id="myInput"
              placeholder="Title..."
              .value=${this.todo}
              @input=${this.handleInput}
              @keypress=${this.handleKeyPress}
            />
            <button type="submit" @click=${this.createNewToDoItem} class="addBtn">Add</button>
          </form>
        </div>
        <ul>
          ${this.list.map((item, key) => {
            return html`
              <li>
                <todo-item
                  item=${item}
                  .deleteItem=${this.deleteItem.bind(this, key)}
                ></todo-item>
              </li>
            `;
          })}
        </ul>
      </div>
    `;
  }
}
