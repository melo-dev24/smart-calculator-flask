from flask import Flask, render_template, request, redirect, url_for
from calculator import Calculator

app = Flask(__name__)
calc = Calculator()


@app.route("/", methods=["GET", "POST"])
def index():
    result = None
    if request.method == "POST":
        expr = request.form.get("expression", "")
        original_expr = request.form.get("original_expression", "")
        if expr:  # Only calculate if expression is not empty
            result = calc.calculate(expr, original_expr)

    return render_template("index.html", result=result, history=calc.history)


@app.route("/clear-history", methods=["POST"])
def clear_history():
    """Clear calculation history"""
    calc.clear_history()
    return redirect(url_for("index"))


if __name__ == "__main__":
    app.run(debug=True)
